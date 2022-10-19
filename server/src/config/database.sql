CREATE TABLE  fms_tt_load(
    id SERIAL PRIMARY KEY,
    volume INTEGER,
    pcs INTEGER,
    gross_weight NUMERIC,
    job_number VARCHAR(16),
    created_on DATE DEFAULT now(),
    updated_on DATE,
    employee_id INTEGER,
    pickup_date DATE,
    shipper_id INTEGER,
    consignee_id INTEGER,
    order_id INTEGER
);
CREATE TABLE fms_tt_load_details (
    load_id INTEGER REFERENCES fms_tt_load(id),
    load_details  JSONB
);
CREATE TABLE  fms_tt_orders(
    id SERIAL PRIMARY KEY,
    order_date DATE,
    employee_id INTEGER,
    order_number VARCHAR(16),
    price INTEGER,
    haulier_id INTEGER,
    haulier_instructions VARCHAR(200)
);
ALTER TABLE fms_tt_load
ADD CONSTRAINT fk_fms_tt_load_shipper FOREIGN KEY (shipper_id) REFERENCES shipper(id),
ADD CONSTRAINT fk_fms_tt_load_consignee FOREIGN KEY (consignee_id) REFERENCES shipper(id),
ADD CONSTRAINT fk_fms_tt_load_order FOREIGN KEY (order_id) REFERENCES fms_tt_orders(id);
-- 01.02.2022
ALTER TABLE fms_tt_load ALTER COLUMN job_number TYPE VARCHAR(100);
ALTER TABLE fms_tt_orders ALTER COLUMN order_number TYPE VARCHAR(100);
-- 03.02.2022
-- may required to run GRANT permission
GRANT ALL PRIVILEGES ON TABLE fms_tt_load TO karl;
GRANT ALL PRIVILEGES ON TABLE fms_tt_load_details TO karl;
GRANT ALL PRIVILEGES ON TABLE shipper TO karl;
GRANT ALL PRIVILEGES ON TABLE employee TO karl;
GRANT ALL PRIVILEGES ON TABLE country TO karl;
GRANT ALL PRIVILEGES ON TABLE address TO karl;
GRANT ALL PRIVILEGES ON TABLE vendor TO karl;
GRANT ALL PRIVILEGES ON fms_tt_load_id_seq TO karl;
GRANT ALL PRIVILEGES ON TABLE fms_tt_orders TO karl;
GRANT ALL PRIVILEGES ON fms_tt_orders_id_seq TO karl;
-- 24.02.2022
ALTER TABLE fms_tt_orders
ADD COLUMN currency VARCHAR(3) DEFAULT '';
--25.02.2022
GRANT ALL PRIVILEGES ON TABLE curr TO karl;
--09.03.2022
ALTER TABLE fms_tt_load
ALTER COLUMN volume TYPE NUMERIC;

--03.05.2022
ALTER TABLE fms_tt_load
ADD COLUMN canceled BOOLEAN DEFAULT false;

--04.05.2022
ALTER TABLE fms_tt_orders
ADD COLUMN canceled BOOLEAN DEFAULT false;

--05.05.2022
ALTER TABLE fms_tt_load
ADD COLUMN cancel_reason VARCHAR(500);
ALTER TABLE fms_tt_orders
ADD COLUMN cancel_reason VARCHAR(500);
