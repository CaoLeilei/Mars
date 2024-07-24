import { Migration } from '@mikro-orm/migrations';

export class Migration20240722002725 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `organization_user` add column `role` text not null;');

    this.addSql('alter table `user` add column `roles` text null;');
  }

}
