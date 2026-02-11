CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    description TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    day INTEGER NOT NULL CHECK (
        day >= 1
        AND day <= 31
    ),
    month INTEGER NOT NULL CHECK (
        month >= 1
        AND month <= 12
    ),
    year INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS gambling (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    game TEXT NOT NULL,
    net_amount NUMERIC(12, 2) NOT NULL,
    month INTEGER NOT NULL CHECK (
        month >= 1
        AND month <= 12
    ),
    year INTEGER NOT NULL
);