DROP TABLE "project_tags" CASCADE;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "tags" text[];