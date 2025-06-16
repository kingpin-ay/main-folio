CREATE TABLE "blog" (
	"id" bigint PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"blog_text" text NOT NULL,
	"created_time" timestamp with time zone NOT NULL,
	"estimate_read_time" text,
	"tag" text,
	"user_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "contact_details" (
	"id" bigint PRIMARY KEY NOT NULL,
	"user_id" bigint NOT NULL,
	"link" text NOT NULL,
	"link_type" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project_tags" (
	"id" bigint PRIMARY KEY NOT NULL,
	"project_id" bigint NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" bigint PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"image_link" text,
	"demo_link" text,
	"code_link" text,
	"user_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stack_group" (
	"id" bigint PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"user_id" bigint NOT NULL
);
--> statement-breakpoint
CREATE TABLE "stack_item" (
	"id" bigint PRIMARY KEY NOT NULL,
	"stack_group_id" bigint NOT NULL,
	"name" text NOT NULL,
	"image_link" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_about" (
	"id" bigint PRIMARY KEY NOT NULL,
	"short_description" text,
	"description" text NOT NULL,
	"image_link" text NOT NULL,
	"user_id" bigint NOT NULL,
	"email" text,
	"phone_number" text,
	"location" text
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" bigint PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"bio" text NOT NULL,
	"designation" text,
	"user_name" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "user_user_name_unique" UNIQUE("user_name")
);
--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "contact_details" ADD CONSTRAINT "contact_details_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_tags" ADD CONSTRAINT "project_tags_project_id_project_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."project"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stack_group" ADD CONSTRAINT "stack_group_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "stack_item" ADD CONSTRAINT "stack_item_stack_group_id_stack_group_id_fk" FOREIGN KEY ("stack_group_id") REFERENCES "public"."stack_group"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_about" ADD CONSTRAINT "user_about_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;