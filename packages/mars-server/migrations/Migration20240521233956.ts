import { Migration } from '@mikro-orm/migrations';

export class Migration20240521233956 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `project` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `name` text not null);');
    this.addSql('create index `project_id_index` on `project` (`id`);');
    this.addSql('create index `project_idx_index` on `project` (`idx`);');

    this.addSql('create table `refresh_token` (`id` integer not null primary key autoincrement, `idx` text null, `is_active` integer null default true, `is_deleted` integer null default false, `deleted_at` datetime null, `created_at` datetime null, `updated_at` datetime null, `expires_in` datetime not null, `user_id` integer not null, `is_revoked` integer null default false, constraint `refresh_token_user_id_foreign` foreign key(`user_id`) references `user`(`id`) on update cascade);');
    this.addSql('create index `refresh_token_id_index` on `refresh_token` (`id`);');
    this.addSql('create index `refresh_token_idx_index` on `refresh_token` (`idx`);');
    this.addSql('create index `refresh_token_user_id_index` on `refresh_token` (`user_id`);');
  }

}
