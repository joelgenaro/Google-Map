CREATE TABLE IF NOT EXISTS "landAssessmentCarbonEstimationArea" (
  "id" uuid PRIMARY KEY NOT NULL,
  "userId" uuid NOT NULL,
  "carbonMethod" text[],
  "data" jsonb NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "landAssessmentCarbonExclusionArea" (
  "id" uuid PRIMARY KEY NOT NULL,
  "userId" uuid NOT NULL,
  "data" jsonb NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "landAssessmentNewProject" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "userId" uuid NOT NULL,
  "projectName" text NOT NULL,
  "data" jsonb NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "platform_update" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "created_at" timestamp DEFAULT NOW(),
  "updated_at" timestamp,
  "deleted_at" timestamp,
  "created_by" text,
  "updated_by" text,
  "deleted_by" text,
  "message" text NOT NULL,
  "start_date" date DEFAULT CURRENT_DATE,
  "end_date" date,
  "enabled" boolean DEFAULT true
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "profile" (
  "userId" uuid NOT NULL,
  "profileType" text NOT NULL,
  "userType" text NOT NULL,
  "registerReason" text NOT NULL,
  "experienceLevel" integer NOT NULL,
  CONSTRAINT "profile_userId_unique" UNIQUE("userId")
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "projectManagement" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "userId" uuid NOT NULL,
  "projectName" text NOT NULL,
  "landholderName" text NOT NULL,
  "address" text NOT NULL,
  "letterOfDeclarationUrl" text,
  "auditScheduleUrl" text,
  "letterToParticipateUrl" text,
  "specificationsUrls" text[],
  "landManagementPlanUrl" text,
  "fireManagementPlanUrl" text,
  "permanencePlanUrl" text,
  "fullCAMFilesUrl" text,
  "carbonEstimationAreaBaselineDataUrl" text,
  "carbonAdditionalFilesUrls" text,
  "carbonAdditionalFilesDescription" text,
  "monitoringPlotsUrl" text,
  "monitoringDataUrl" text,
  "monitoringAdditionalFilesUrls" text,
  "monitoringAdditionalFilesDescription" text
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_management_detail_activity" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "activity" text NOT NULL,
  "status" text NOT NULL,
  "date" timestamp,
  "from_date" timestamp,
  "to_date" timestamp,
  "type" text,
  "description" text,
  "attached_file" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_management_detail_alert" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "alert" text NOT NULL,
  "date" timestamp NOT NULL,
  "raise_issue" text NOT NULL,
  "danger_level" text NOT NULL,
  "status" text NOT NULL,
  "type" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_management_detail_issue" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "issue" text NOT NULL,
  "status" text NOT NULL,
  "action" text,
  "date" timestamp NOT NULL,
  "description" text,
  "attached_file" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_management_monitoring_data_list" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "dataset_name" text NOT NULL,
  "data_collection_date" timestamp NOT NULL,
  "monitoring_timing" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_management_monitoring_plant" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "monitoring_data_id" uuid NOT NULL,
  "plant_id" text,
  "plot_id" text,
  "species" text,
  "height" smallint,
  "canopy_diameter" smallint,
  "plant_notes" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_management_monitoring_plot" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "monitoring_data_id" uuid NOT NULL,
  "plot_id" text,
  "longitude" text,
  "latitude" text,
  "canopy_cover" smallint,
  "leaf_litter" smallint,
  "bair_soil" smallint,
  "rock" smallint,
  "vegetation" smallint,
  "herbivory" boolean,
  "disease" boolean,
  "plot_notes" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "project_management_monitoring_report" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "project_id" uuid NOT NULL,
  "from_date" timestamp,
  "to_date" timestamp,
  "method" text,
  "projectName" text NOT NULL,
  "status" text NOT NULL,
  "report" text,
  "description" text,
  "attached_file" text,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  "deleted_at" timestamp
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "seeds_request" (
  "id" text PRIMARY KEY NOT NULL,
  "created_at" timestamp DEFAULT NOW() NOT NULL,
  "updated_at" timestamp,
  "deleted_at" timestamp,
  "created_by" text,
  "updated_by" text,
  "deleted_by" text,
  "project_id" uuid,
  "required_date" date NOT NULL,
  "seed_treatment" boolean DEFAULT false,
  "seed_viability" boolean DEFAULT false,
  "seed_provenance" boolean DEFAULT false,
  "seeds_species" jsonb NOT NULL,
  "geo_json_data" jsonb,
  "status" "status_enum" NOT NULL
);

--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
  "name" text,
  "email" text NOT NULL,
  "password" text,
  "emailVerified" timestamp,
  "image" text,
  "role" text DEFAULT 'user',
  CONSTRAINT "user_email_unique" UNIQUE("email")
);

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "landAssessmentCarbonEstimationArea" 
  ADD CONSTRAINT "landAssessmentCarbonEstimationArea_userId_user_id_fk" 
  FOREIGN KEY ("userId") 
  REFERENCES "public"."user"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "landAssessmentCarbonExclusionArea" 
  ADD CONSTRAINT "landAssessmentCarbonExclusionArea_userId_user_id_fk" 
  FOREIGN KEY ("userId") 
  REFERENCES "public"."user"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "landAssessmentNewProject" 
  ADD CONSTRAINT "landAssessmentNewProject_userId_user_id_fk" 
  FOREIGN KEY ("userId") 
  REFERENCES "public"."user"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "profile" 
  ADD CONSTRAINT "profile_userId_user_id_fk" 
  FOREIGN KEY ("userId") 
  REFERENCES "public"."user"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "projectManagement" 
  ADD CONSTRAINT "projectManagement_userId_user_id_fk" 
  FOREIGN KEY ("userId") 
  REFERENCES "public"."user"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_detail_activity" 
  ADD CONSTRAINT "project_management_detail_activity_project_id_projectManagement_id_fk" 
  FOREIGN KEY ("project_id") 
  REFERENCES "public"."projectManagement"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_detail_alert" 
  ADD CONSTRAINT "project_management_detail_alert_project_id_projectManagement_id_fk" 
  FOREIGN KEY ("project_id") 
  REFERENCES "public"."projectManagement"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_detail_issue" 
  ADD CONSTRAINT "project_management_detail_issue_project_id_projectManagement_id_fk" 
  FOREIGN KEY ("project_id") 
  REFERENCES "public"."projectManagement"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_monitoring_data_list" 
  ADD CONSTRAINT "project_management_monitoring_data_list_project_id_projectManagement_id_fk" 
  FOREIGN KEY ("project_id") 
  REFERENCES "public"."projectManagement"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_monitoring_plant" 
  ADD CONSTRAINT "project_management_monitoring_plant_project_id_projectManagement_id_fk" 
  FOREIGN KEY ("project_id") 
  REFERENCES "public"."projectManagement"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_monitoring_plant" 
  ADD CONSTRAINT "project_management_monitoring_plant_monitoring_data_id_project_management_monitoring_data_list_id_fk" 
  FOREIGN KEY ("monitoring_data_id") 
  REFERENCES "public"."project_management_monitoring_data_list"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_monitoring_plot" 
  ADD CONSTRAINT "project_management_monitoring_plot_project_id_projectManagement_id_fk" 
  FOREIGN KEY ("project_id") 
  REFERENCES "public"."projectManagement"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_monitoring_plot" 
  ADD CONSTRAINT "project_management_monitoring_plot_monitoring_data_id_project_management_monitoring_data_list_id_fk" 
  FOREIGN KEY ("monitoring_data_id") 
  REFERENCES "public"."project_management_monitoring_data_list"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "project_management_monitoring_report" 
  ADD CONSTRAINT "project_management_monitoring_report_project_id_projectManagement_id_fk" 
  FOREIGN KEY ("project_id") 
  REFERENCES "public"."projectManagement"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
DO $$ 
BEGIN
  ALTER TABLE "seeds_request" 
  ADD CONSTRAINT "seeds_request_project_id_landAssessmentNewProject_id_fk" 
  FOREIGN KEY ("project_id") 
  REFERENCES "public"."landAssessmentNewProject"("id") 
  ON DELETE CASCADE 
  ON UPDATE NO ACTION;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "platform_update_id_idx" 
ON "platform_update" ("id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "seeds_request_id_idx" 
ON "seeds_request" ("id");

--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "seeds_request_project_id_idx" 
ON "seeds_request" ("project_id");

--> statement-breakpoint
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'status_enum') THEN
    CREATE TYPE status_enum AS ENUM ('REQUESTED', 'CANCELLED', 'COMPLETED');
  END IF;
END $$;
