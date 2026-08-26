package com.sales.management.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class CacheService {

    private static final Logger logger = LoggerFactory.getLogger(CacheService.class);

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    @Autowired
    private ObjectMapper objectMapper;

    @Value("${cache.default-ttl:300}")
    private long defaultTtl;

    /**
     * Busca valor do cache
     * @param key Chave do cache
     * @param clazz Classe do objeto
     * @return the object, or null when absent
     */
    public <T> T get(String key, Class<T> clazz) {
        try {
            Object cached = redisTemplate.opsForValue().get(key);
            
            if (cached == null) {
                logger.debug("Cache MISS: {}", key);
                return null;
            }

            logger.debug("Cache HIT: {}", key);
            return objectMapper.convertValue(cached, clazz);
        } catch (Exception e) {
            logger.error("Erro ao buscar cache [{}]: {}", key, e.getMessage());
            return null;
        }
    }

    /**
     * Reads a value from the cache (for generic types such as List, Map)
     * @param key Chave do cache
     * @param typeReference TypeReference for generic types
     * @return the object, or null when absent
     */
    public <T> T get(String key, TypeReference<T> typeReference) {
        try {
            Object cached = redisTemplate.opsForValue().get(key);
            
            if (cached == null) {
                logger.debug("Cache MISS: {}", key);
                return null;
            }

            logger.debug("Cache HIT: {}", key);
            return objectMapper.convertValue(cached, typeReference);
        } catch (Exception e) {
            logger.error("Erro ao buscar cache [{}]: {}", key, e.getMessage());
            return null;
        }
    }

    /**
     * Stores a value in the cache with the default TTL
     * @param key Chave
     * @param value Valor
     */
    public <T> void set(String key, T value) {
        set(key, value, defaultTtl);
    }

    /**
     * Salva valor no cache com TTL customizado
     * @param key Chave
     * @param value Valor
     * @param ttlSeconds TTL em segundos
     */
    public <T> void set(String key, T value, long ttlSeconds) {
        try {
            redisTemplate.opsForValue().set(key, value, ttlSeconds, TimeUnit.SECONDS);
            logger.info("Cache salvo [{}] - TTL: {}s", key, ttlSeconds);
        } catch (Exception e) {
            logger.error("Erro ao salvar cache [{}]: {}", key, e.getMessage());
        }
    }

    /**
     * Deletes one specific key
     * @param key Chave
     */
    public void delete(String key) {
        try {
            redisTemplate.delete(key);
            logger.info("Cache deletado: {}", key);
        } catch (Exception e) {
            logger.error("Erro ao deletar cache [{}]: {}", key, e.getMessage());
        }
    }

    /**
     * Deletes multiple keys by pattern (wildcards)
     * @param pattern the key pattern, e.g. "products:*", "sales:user:123:*"
     */
    public void deletePattern(String pattern) {
        try {
            Set<String> keys = redisTemplate.keys(pattern);
            
            if (keys == null || keys.isEmpty()) {
                logger.info("No keys found for pattern: {}", pattern);
                return;
            }

            redisTemplate.delete(keys);
            logger.info("{} chaves deletadas [{}]", keys.size(), pattern);
        } catch (Exception e) {
            logger.error("Error deleting pattern [{}]: {}", pattern, e.getMessage());
        }
    }

    /**
     * Verifica se uma chave existe
     * @param key Chave
     * @return true se existir
     */
    public boolean exists(String key) {
        try {
            Boolean exists = redisTemplate.hasKey(key);
            return exists != null && exists;
        } catch (Exception e) {
            logger.error("Error checking existence [{}]: {}", key, e.getMessage());
            return false;
        }
    }

    /**
     * Returns the remaining time to live for a key
     * @param key Chave
     * @return seconds remaining, or -1 when the key does not exist
     */
    public long getTTL(String key) {
        try {
            Long ttl = redisTemplate.getExpire(key, TimeUnit.SECONDS);
            return ttl != null ? ttl : -1;
        } catch (Exception e) {
            logger.error("Erro ao buscar TTL [{}]: {}", key, e.getMessage());
            return -1;
        }
    }

    /**
     * Limpa TODOS os caches (use com cuidado!)
     */
    public void flushAll() {
        try {
            redisTemplate.getConnectionFactory().getConnection().flushAll();
            logger.warn("TODOS os caches foram limpos!");
        } catch (Exception e) {
            logger.error("Erro ao limpar todos os caches: {}", e.getMessage());
        }
    }

    /**
     * Helper: read from cache, or run the supplier and store it
     * @param key Chave
     * @param clazz Classe do retorno
     * @param supplier supplies the data when it is not cached
     * @return the data, from the cache or from the supplier
     */
    public <T> T getOrCompute(String key, Class<T> clazz, java.util.function.Supplier<T> supplier) {
        T cached = get(key, clazz);
        
        if (cached != null) {
            return cached;
        }

        // Not cached: fetch it
        T data = supplier.get();
        
        if (data != null) {
            set(key, data);
        }

        return data;
    }

    /**
     * Helper: read from cache, or run the supplier and store it (custom TTL)
     */
    public <T> T getOrCompute(String key, Class<T> clazz, java.util.function.Supplier<T> supplier, long ttlSeconds) {
        T cached = get(key, clazz);
        
        if (cached != null) {
            return cached;
        }

        T data = supplier.get();
        
        if (data != null) {
            set(key, data, ttlSeconds);
        }

        return data;
    }
}