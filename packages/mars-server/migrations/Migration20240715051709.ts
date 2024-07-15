import { Migration } from '@mikro-orm/migrations';

export class Migration20240715051709 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table `project` add column `desc` text not null;');

    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter375` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `idx` text NULL, `is_active` integer NULL DEFAULT true, `is_deleted` integer NULL DEFAULT false, `deleted_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, `username` text NOT NULL, `email` text NOT NULL, `bio` text, `avatar` text, `password` text NOT NULL, `two_factor_secret` text NULL, `is_two_factor_enabled` integer NULL DEFAULT false, `roles` text NULL, `mobile_number` text NULL, `is_verified` integer NULL DEFAULT false, `social` json NULL, `last_login` datetime NULL, `truename` text, `nickname` text);');
    this.addSql('INSERT INTO "_knex_temp_alter375" SELECT * FROM "user";;');
    this.addSql('DROP TABLE "user";');
    this.addSql('ALTER TABLE "_knex_temp_alter375" RENAME TO "user";');
    this.addSql('CREATE INDEX `user_id_index` on `user` (`id`);');
    this.addSql('CREATE INDEX `user_idx_index` on `user` (`idx`);');
    this.addSql('CREATE INDEX `user_username_index` on `user` (`username`);');
    this.addSql('CREATE UNIQUE INDEX `user_username_unique` on `user` (`username`);');
    this.addSql('CREATE INDEX `user_email_index` on `user` (`email`);');
    this.addSql('CREATE UNIQUE INDEX `user_email_unique` on `user` (`email`);');
    this.addSql('CREATE INDEX `user_mobile_number_index` on `user` (`mobile_number`);');
    this.addSql('CREATE UNIQUE INDEX `user_mobile_number_unique` on `user` (`mobile_number`);');
    this.addSql('PRAGMA foreign_keys = ON;');
  }

}
