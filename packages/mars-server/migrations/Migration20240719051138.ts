import { Migration } from '@mikro-orm/migrations';

export class Migration20240719051138 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `app_environments` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `name` text not null, `desc` text null, `organization_id` text not null, `is_default` integer not null default false, `priority` integer not null default 0, `enabled` integer not null default true);');
    this.addSql('create index `app_environments_id_index` on `app_environments` (`id`);');
    this.addSql('create index `app_environments_idx_index` on `app_environments` (`idx`);');
    this.addSql('create unique index `organizationId` on `app_environments` (`organization_id`);');

    this.addSql('create table `organizations` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `name` text not null, `desc` text null, `slug` text not null, `domain` text null, `enable_sign_up` integer not null);');
    this.addSql('create index `organizations_id_index` on `organizations` (`id`);');
    this.addSql('create index `organizations_idx_index` on `organizations` (`idx`);');
    this.addSql('create unique index `organizations_name_unique` on `organizations` (`name`);');
    this.addSql('create unique index `organizations_slug_unique` on `organizations` (`slug`);');

    this.addSql('create table `organization_user` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `organization_id` text not null, `user_id` text not null);');
    this.addSql('create index `organization_user_id_index` on `organization_user` (`id`);');
    this.addSql('create index `organization_user_idx_index` on `organization_user` (`idx`);');

    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `username` text not null, `password` text not null, `email` text not null, `truename` text null default \'\', `nickname` text null default \'\', `bio` text null default \'\', `avatar` text null default \'\', `two_factor_secret` text null, `is_two_factor_enabled` integer null default false, `roles` text null, `mobile_number` text null, `is_verified` integer null default false, `social` json null, `last_login` datetime null);');
    this.addSql('create index `user_id_index` on `user` (`id`);');
    this.addSql('create index `user_idx_index` on `user` (`idx`);');
    this.addSql('create index `user_username_index` on `user` (`username`);');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');
    this.addSql('create index `user_email_index` on `user` (`email`);');
    this.addSql('create unique index `user_email_unique` on `user` (`email`);');
    this.addSql('create index `user_mobile_number_index` on `user` (`mobile_number`);');
    this.addSql('create unique index `user_mobile_number_unique` on `user` (`mobile_number`);');

    this.addSql('create table `refresh_token` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `expires_in` datetime not null, `user_id` integer not null, `is_revoked` integer null default false, constraint `refresh_token_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on update cascade);');
    this.addSql('create index `refresh_token_id_index` on `refresh_token` (`id`);');
    this.addSql('create index `refresh_token_idx_index` on `refresh_token` (`idx`);');
    this.addSql('create index `refresh_token_user_id_index` on `refresh_token` (`user_id`);');

    this.addSql('create table `apps` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `name` text not null, `desc` text not null, `is_public` integer not null default false, `icon` text null default false, `current_version_id` text not null default \'0.0.0\', `organization_id` text not null, `creator_id` integer not null, constraint `apps_creator_id_foreign` foreign key(`creator_id`) references `user`(`id`) on update cascade);');
    this.addSql('create index `apps_id_index` on `apps` (`id`);');
    this.addSql('create index `apps_idx_index` on `apps` (`idx`);');
    this.addSql('create index `apps_creator_id_index` on `apps` (`creator_id`);');
  }

}
