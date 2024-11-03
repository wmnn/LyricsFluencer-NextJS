// @ts-ignore  
import { env } from '@lyricsfluencer/env'

export async function handleTranslate(text, targetLanguage): Promise<string[]> {
    try {
        const res = await (await fetch('https://translation.googleapis.com/language/translate/v2', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                q: text,
                key: env.GOOGLETRANSLATEAPIKEY,
                target: targetLanguage,
                format: 'text',
            }).toString(),
        })).json()
        
        return res.data.translations[0].translatedText.split('\n');
    } catch (_) {
        return []
    }
}