import { faker } from '@faker-js/faker';

export function generateFakeUsers(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
  }));
}
