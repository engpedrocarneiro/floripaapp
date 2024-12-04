export const EVENT = {
  name: 'Sapiens Parque Innovation Event',
  startDate: new Date('2024-12-14T09:00:00'),
  endDate: new Date('2024-12-15T20:00:00'),
  location: {
    name: 'Sapiens Parque',
    address: 'Av. Luiz Boiteux Piazza, 1302',
    neighborhood: 'Canasvieiras',
    city: 'Florianópolis',
    state: 'SC',
    zipCode: '88056-000',
    contact: {
      phone: '+55 (48) 3664-0532',
      email: 'sapiens@sapiensparque.sc.gov.br',
      businessHours: '08h às 17h (Segunda a Sexta)',
      hotline: '0800-6448500'
    }
  }
} as const;