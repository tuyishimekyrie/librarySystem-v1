CREATE TABLE IF NOT EXISTS "role" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_role" (
	"userId" text,
	"roleId" text
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_role" ADD CONSTRAINT "user_role_roleId_role_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."role"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "unique_name" ON "role" USING btree ("name");