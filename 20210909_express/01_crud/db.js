import { readFile, writeFile } from 'fs/promises'
import path from 'path'

const DbPath = './db.json'

export const getDb = async () => {
    const data = await readFile(DbPath, { encoding: 'utf-8' })
    return JSON.parse(data)
}

export const saveDb = async (payload) => {
    return writeFile(DbPath, JSON.stringify(payload))
}

