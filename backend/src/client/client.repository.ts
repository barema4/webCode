import { EntityRepository, Repository } from 'typeorm';
import { Client } from './entities/client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {
  // Custom repository methods can be defined here if needed
}
