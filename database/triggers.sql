create trigger trg_set_updated_at BEFORE
update on products for EACH row
execute FUNCTION set_updated_at ();