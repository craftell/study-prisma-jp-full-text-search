-- CreateIndex
CREATE INDEX "Article_body_idx" ON "Article" USING GIN ("body" gin_bigm_ops);
