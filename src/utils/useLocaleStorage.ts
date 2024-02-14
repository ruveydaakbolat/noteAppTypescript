import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    // state in ilk değerini tanımla eğer local de bir değer varsa onu al yoksa gelen initial state i kullan
    const [value, setValue] = useState<T>(() => {
        const jsonValue = localStorage.getItem(key);
        if (jsonValue === null) {
            return initialValue;
        } else {
            return JSON.parse(jsonValue);
        }
    })

    // state her değiştiğinde local'i güncelle
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    // state i ve güncellemeye yarayan fonksiyonu döndür
    return [value, setValue] as [T, typeof setValue];
}