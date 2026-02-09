CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS expenses {
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    description TEXT,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    day INTEGER NOT NULL CHECK (day >= 1 AND day <= 31),
    month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
    year INTEGER NOT NULL CHECK
};