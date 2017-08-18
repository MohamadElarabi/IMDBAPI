--FeatureType
insert into FeatureType Values ('Movie');
insert into FeatureType Values ('Play');
insert into FeatureType Values ('TV Show');
insert into FeatureType Values ('Song');
insert into FeatureType Values ('Music Video');
insert into FeatureType Values ('Documentary');
--RoleType
insert into RoleType Values ('Actor');
insert into RoleType Values ('Director');
insert into RoleType Values ('Producer');
--Artist
insert into Artist Values ('Clint','Eastwood','Actor, director, and producer');
insert into Artist Values ('Tom','Cruise','Actor');
insert into Artist Values ('Steven','Spielberg','Director');
insert into Artist Values ('Michael','Jackson','Singer, actor, and performer');
insert into Artist Values ('Nicole','Kidman','Actress, born in Australia. Married Tom Cruise');
insert into Artist Values ('Brad','Pitt','Actor. Married Angelina Jolie');
--Feature
insert into Feature Values ('The Good, the bad, and the ugly','great movie',1);
insert into Feature Values ('Million Dollar Baby','A boxing movie',1);
insert into Feature Values ('Top Gun','A movie about jet planes',1);
insert into Feature Values ('Seinfeld','A comedy tv show',3);
--FeatureRole
insert into FeatureRole Values (1,1,1);
insert into FeatureRole Values (2,1,1);
insert into FeatureRole Values (2,1,2);
insert into FeatureRole Values (3,2,1);
