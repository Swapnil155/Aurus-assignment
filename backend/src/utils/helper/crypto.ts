import crypto from 'crypto';
import config from '../../config/config';

export const encrypt = (text: string): string => {
    const iv = crypto.randomBytes(config.crypto.iv_length);
    const cipher = crypto.createCipheriv(config.crypto.algorithm, Buffer.from(config.crypto.secretKey), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

export const decrypt = (text: string): string => {
    const parts = text.split(':');
    const iv = Buffer.from(parts.shift()!, 'hex');
    const encryptedText = Buffer.from(parts.join(':'), 'hex');
    const decipher = crypto.createDecipheriv(config.crypto.algorithm, Buffer.from(config.crypto.secretKey), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
};
