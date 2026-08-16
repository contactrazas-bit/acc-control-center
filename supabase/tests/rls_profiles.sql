begin;

select plan(4);

select has_table('public', 'profiles');
select policies_are('public', 'profiles', array['Owners can select own profile', 'Owners can update own profile']);
select row_security_is_enabled('public', 'profiles');
select force_row_security_is_enabled('public', 'profiles');

select * from finish();
rollback;
