// @ts-ignore
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

export function getPrismaModels() {
  const schemaPath = path.resolve('prisma', 'schema.prisma');
  const schema = fs.readFileSync(schemaPath, 'utf-8');

  const models = [];
  const regex = /model (\w+)\s+{([^}]*)}/g;
  let match;

  while ((match = regex.exec(schema)) !== null) {
    const modelName = match[1];
    const modelBody = match[2];
    const fields = extractFields(modelBody);
    models.push({ modelName, fields });
  }

  return models;
}

function extractFields(modelBody: string) {
  const fields = [];
  const regex = /(\w+): (\w+)/g;
  let match;

  while ((match = regex.exec(modelBody)) !== null) {
    fields.push({ field: match[1], type: match[2] });
  }

  return fields;
}
