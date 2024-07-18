import { Migration } from '@mikro-orm/migrations';

export class Migration20240718152848 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `apps` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `name` text not null, `desc` text not null, `is_public` integer not null default false, `icon` text null default false, `current_version_id` text not null default \'0.0.0\', `user_id` text not null);');
    this.addSql('create index `apps_id_index` on `apps` (`id`);');
    this.addSql('create index `apps_idx_index` on `apps` (`idx`);');

    this.addSql('create table `app_environments` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `name` text not null, `desc` text null, `organization_id` text not null, `is_default` integer not null default false, `priority` integer not null default 0, `enabled` integer not null default true);');
    this.addSql('create index `app_environments_id_index` on `app_environments` (`id`);');
    this.addSql('create index `app_environments_idx_index` on `app_environments` (`idx`);');
    this.addSql('create unique index `organizationId` on `app_environments` (`organization_id`);');

    this.addSql('create table `organizations` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `name` text not null, `desc` text null, `slug` text not null, `domain` text null, `enable_sign_up` integer not null);');
    this.addSql('create index `organizations_id_index` on `organizations` (`id`);');
    this.addSql('create index `organizations_idx_index` on `organizations` (`idx`);');
    this.addSql('create unique index `organizations_name_unique` on `organizations` (`name`);');
    this.addSql('create unique index `organizations_slug_unique` on `organizations` (`slug`);');

    this.addSql('drop table if exists `project`;');

    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter740` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `idx` text NULL, `is_active` integer NULL DEFAULT true, `is_deleted` integer NULL DEFAULT false, `deleted_at` datetime NULL, `created_at` datetime NULL, `updated_at` datetime NULL, `username` text NOT NULL, `email` text NOT NULL, `bio` text DEFAULT \'\', `avatar` text DEFAULT \'\', `password` text NOT NULL, `two_factor_secret` text NULL, `is_two_factor_enabled` integer NULL DEFAULT false, `roles` text NULL, `mobile_number` text NULL, `is_verified` integer NULL DEFAULT false, `social` json NULL, `last_login` datetime NULL, `truename` text DEFAULT \'\', `nickname` text DEFAULT \'\');');
    this.addSql('INSERT INTO "_knex_temp_alter740" SELECT * FROM "user";;');
    this.addSql('DROP TABLE "user";');
    this.addSql('ALTER TABLE "_knex_temp_alter740" RENAME TO "user";');
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
