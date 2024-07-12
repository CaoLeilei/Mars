import { Migration } from '@mikro-orm/migrations';

export class Migration20240516053601 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `user` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `first_name` text not null, `middle_name` text null, `last_name` text not null, `username` text not null, `email` text not null, `bio` text not null, `avatar` text not null, `password` text not null, `two_factor_secret` text null, `is_two_factor_enabled` integer null default false, `roles` text null, `mobile_number` text null, `is_verified` integer null default false, `social` json null, `last_login` datetime null);');
    this.addSql('create index `user_id_index` on `user` (`id`);');
    this.addSql('create index `user_idx_index` on `user` (`idx`);');
    this.addSql('create index `user_username_index` on `user` (`username`);');
    this.addSql('create unique index `user_username_unique` on `user` (`username`);');
    this.addSql('create index `user_email_index` on `user` (`email`);');
    this.addSql('create unique index `user_email_unique` on `user` (`email`);');
    this.addSql('create index `user_mobile_number_index` on `user` (`mobile_number`);');
    this.addSql('create unique index `user_mobile_number_unique` on `user` (`mobile_number`);');
  }

}
