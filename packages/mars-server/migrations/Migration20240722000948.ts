import { Migration } from '@mikro-orm/migrations';

export class Migration20240722000948 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` drop column `roles`;');
  }

}
