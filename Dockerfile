# 1. Install dependencies only when needed
FROM node:lts-buster-slim AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
RUN apt-get update && apt-get install libssl-dev ca-certificates -y

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi


# 2. Rebuild the source code only when needed
FROM deps AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV PRISMA_BINARIES_MIRROR http://prisma-builds.s3-eu-west-1.amazonaws.com
RUN yarn run prisma generate
RUN yarn build


FROM deps as prod


COPY --from=deps /app/node_modules ./node_modules
# RUN addgroup -g 1001 -S nodejs
# RUN adduser -S nextjs -u 1001
#COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/ ./.next/
COPY --from=builder  /app/prisma /app/prisma
#USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV PRISMA_BINARIES_MIRROR http://prisma-builds.s3-eu-west-1.amazonaws.com
RUN yarn run prisma generate
#RUN yarn run prisma db push
#CMD ["yarn", "run", "prisma", "db", "push"]
CMD ["yarn", "start"]
