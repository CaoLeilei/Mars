import { Migration } from '@mikro-orm/migrations';

export class Migration20240524052920 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `user` drop column `first_name`;');
    this.addSql('alter table `user` drop column `middle_name`;');
    this.addSql('alter table `user` drop column `last_name`;');

    this.addSql('alter table `user` add column `truename` text not null;');
    this.addSql('alter table `user` add column `nickname` text not null;');
  }

}
