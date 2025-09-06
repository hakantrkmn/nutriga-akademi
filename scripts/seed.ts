#!/usr/bin/env tsx

import { seedAll } from '../src/lib/admin'

async function main() {
  try {
    await seedAll()
    process.exit(0)
  } catch (error) {
    console.error('Seed işlemi başarısız:', error)
    process.exit(1)
  }
}

main()
