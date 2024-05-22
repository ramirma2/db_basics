SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

-- Table `Members`
DROP TABLE IF EXISTS `Members`;
CREATE TABLE IF NOT EXISTS `Members` (
  `member_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(20),
  `member_since` DATE NOT NULL,
  `membership_exp` DATE NOT NULL,
  `birthdate` DATE NOT NULL,
  `classes_completed` INT NOT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE (email)
) 
ENGINE=InnoDB;

-- Table `Instructors`
DROP TABLE IF EXISTS `Instructors`;
CREATE TABLE IF NOT EXISTS `Instructors` (
  `instructor_id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `preferred_name` VARCHAR(100),
  `email` VARCHAR(255) NOT NULL,
  `phone_number` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`instructor_id`),
  UNIQUE (email)
) 
ENGINE=InnoDB;


-- Table `Classes`
DROP TABLE IF EXISTS `Classes`;
CREATE TABLE IF NOT EXISTS `Classes` (
  `class_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `duration` VARCHAR(50) NOT NULL,
  `capacity` INT NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`class_id`),
  UNIQUE(name)
) 
ENGINE=InnoDB;

-- Table `Schedules`
DROP TABLE IF EXISTS `Schedules`;
CREATE TABLE IF NOT EXISTS `Schedules` (
  `schedule_id` INT NOT NULL AUTO_INCREMENT,
  `class_id` INT NOT NULL,
  `date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `end_time` TIME NOT NULL,
  `day_of_the_week` VARCHAR(20) NOT NULL,
  `instructor` VARCHAR(100) NOT NULL,
  `at_capacity` TINYINT(1) NOT NULL DEFAULT '0',
  `status` VARCHAR(45) NOT NULL DEFAULT 'open',
  `members_enrolled` INT NOT NULL,
  PRIMARY KEY (`schedule_id`),
  FOREIGN KEY (`class_id`) REFERENCES `Classes`(`class_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) 
ENGINE=InnoDB;

-- Table `Sign_up_Schedules`
DROP TABLE IF EXISTS `Sign_up_Schedules`;
CREATE TABLE IF NOT EXISTS `Sign_up_Schedules` (
  `sign_up_schedule_id` INT NOT NULL AUTO_INCREMENT,
  `schedule_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  `no_show` TINYINT(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`sign_up_schedule_id`),
  FOREIGN KEY (`schedule_id`) REFERENCES `Schedules` (`schedule_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE,
  FOREIGN KEY (`member_id`) REFERENCES `Members` (`member_id`)
  ON DELETE CASCADE
  ON UPDATE CASCADE
) 
ENGINE=InnoDB;

-- Taable Instructors_has_Classes
DROP TABLE IF EXISTS `Instructors_has_Classes`;
CREATE TABLE IF NOT EXISTS `Instructors_has_Classes` (
    `instructors_has_classes_id` INT NOT NULL AUTO_INCREMENT ,
    `instructor_id` INT NOT NULL,
    `class_id` INT NOT NULL,
    PRIMARY KEY (`instructors_has_classes_id`),
    FOREIGN KEY (`instructor_id`) REFERENCES `Instructors`(`instructor_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
    FOREIGN KEY (`class_id`) REFERENCES `Classes`(`class_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
)
ENGINE=InnoDB;

----INSERTS-------

-- Insert data into Members table
INSERT INTO Members (first_name, last_name, email, phone_number, member_since, membership_exp, birthdate, classes_completed)
VALUES 
('Paul', 'Kim', 'paulkim@gmail.com', '630-912-0238', '2024-01-02', '2025-01-02', '2000-04-30', 4),
('Jayson', 'Tatum', 'tatum@gmail.com', '837-234-2349', '2023-12-01', '2024-12-01', '1998-09-02', 15),
('John', 'Telway', 'johnt@gmail.com', '234-938-9283', '2024-04-01', '2025-04-01', '1990-02-23', 6),
('Claire', 'Bowles', 'claireb@gmail.com', '203-234-0948', '2023-08-23', '2024-08-23', '1995-04-23', 2),
('Jacob', 'Darnold', 'jd12@gmail.com', '738-923-2093', '2024-04-01', '2025-04-01', '2002-06-09', 3),
('Clay', 'Bateman', 'clay@yahoo.com', '234-842-9382', '2024-01-30', '2025-01-30', '1989-03-12', 1);


-- Insert data into Instructors table

INSERT INTO Instructors (first_name, last_name, preferred_name, email, phone_number)
VALUES( "John", "Doe", "Johnny", "jd@email.com", "986-897-9999"),
("Lucas", "Johnson", "Lu", "lj@email.com", "345-333-3333" ),
("Kailee", "Doe", "Kailee", 'kd@email.com', "345-344-4444");

-- Insert sample data into Classes table
INSERT INTO Classes (name, duration, capacity, description)
VALUES 
('Strength 1', '50 mins', 15, 'Good for beginners. This class offers a safe way to build strength and learn the foundations of our strength program in a low-medium impact workout that will leave you feeling stronger physically and mentally.'),
('Strength', '50 mins', 15, 'Build your strength through a series of weight-bearing exercises followed by movement sequences to improve mobility and flexibility. We end with a high-impact cardio burst.'),
('Strength Advanced', '75 mins', 15, 'Test your limits in this advanced version of our signature strength class.'),
('Recovery', '50 mins', 20, 'Restore and rebalance your body with the use of a foam roller and active stretching to help recover your muscles.');


-- Insert data into Instructors_has_Classes table

INSERT INTO Instructors_has_Classes (instructor_id, class_id)
VALUES ((SELECT instructor_id FROM Instructors WHERE email='jd@email.com'),
(SELECT class_id FROM Classes WHERE name="Strength 1")),
((SELECT instructor_id FROM Instructors WHERE email='jd@email.com'),
(SELECT class_id FROM Classes WHERE name="Strength")),
((SELECT instructor_id FROM Instructors WHERE email='jd@email.com'),
(SELECT class_id FROM Classes WHERE name="Strength Advanced")),
((SELECT instructor_id FROM Instructors WHERE email='lj@email.com'),
(SELECT class_id FROM Classes WHERE name="Strength 1")),
((SELECT instructor_id FROM Instructors WHERE email='lj@email.com'),
(SELECT class_id FROM Classes WHERE name="Recovery")),
((SELECT instructor_id FROM Instructors WHERE email='kd@email.com'),
(SELECT class_id FROM Classes WHERE name="Strength Advanced"));

-- Insert data into Schedules table
INSERT INTO Schedules (class_id ,date, start_time, end_time, day_of_the_week, instructor, status, members_enrolled)
VALUES 
( (SELECT class_id FROM Classes WHERE name ="Strength" ), '2024-05-01', '06:00:00', '06:50:00', 'Monday', 'Johnny', 'open', 1),
( (SELECT class_id FROM Classes WHERE name = "Strength 1" ), '2024-05-01', '09:00:00', '09:50:00', 'Monday', 'Lu', 'open', 2),
( (SELECT class_id FROM Classes WHERE name ="Strength" ), '2024-05-01', '17:00:00', '17:50:00', 'Monday', 'Lu', 'open', 3),
( (SELECT class_id FROM Classes WHERE name = "Strength Advanced"), '2024-05-01', '17:45:00', '19:00:00', 'Monday', 'Kailee', 'open', 4),
( (SELECT class_id FROM Classes WHERE name = "Strength") , '2024-05-02', '06:00:00', '06:50:00', 'Tuesday', 'Johnny', 'open', 1),
( (SELECT class_id FROM Classes WHERE name = "Strength"), '2024-05-02', '09:00:00', '09:50:00', 'Tuesday', 'Lu', 'open', 2),
( (SELECT class_id FROM Classes WHERE name = "Strength Advanced"), '2024-05-02', '17:00:00', '18:15:00', 'Tuesday', 'Kailee', 'open', 3),
( (SELECT class_id FROM Classes WHERE name = "Recovery"), '2024-05-02', '19:00:00', '19:50:00', 'Tuesday', 'Lu', 'canceled', 0);



-- Insert data into Sign_up_Schedules table
INSERT INTO Sign_up_Schedules (schedule_id, member_id)
VALUES 
((SELECT schedule_id FROM Schedules WHERE date='2024-05-01' AND start_time = '06:00:00'), 
(SELECT member_id FROM Members WHERE email='paulkim@gmail.com')),
((SELECT schedule_id FROM Schedules WHERE date='2024-05-01' AND start_time = '06:00:00'), 
(SELECT member_id FROM Members WHERE email='tatum@gmail.com')),
((SELECT schedule_id FROM Schedules WHERE date='2024-05-01' AND start_time = '06:00:00'), 
(SELECT member_id FROM Members WHERE email='claireb@gmail.com')),
((SELECT schedule_id FROM Schedules WHERE date='2024-05-01' AND start_time = '06:00:00'), 
(SELECT member_id FROM Members WHERE email='clay@yahoo.com')),
((SELECT schedule_id FROM Schedules WHERE date='2024-05-01' AND start_time = "09:00:00"), 
(SELECT member_id FROM Members WHERE email='johnt@gmail.com')),
((SELECT schedule_id FROM Schedules WHERE date='2024-05-01' AND start_time = "09:00:00"), 
(SELECT member_id FROM Members WHERE email='tatum@gmail.com')),
((SELECT schedule_id FROM Schedules WHERE date='2024-05-02' AND start_time = "17:00:00"), 
(SELECT member_id FROM Members WHERE email='johnt@gmail.com')),
((SELECT schedule_id FROM Schedules WHERE date='2024-05-02' AND start_time = "17:00:00"), 
(SELECT member_id FROM Members WHERE email='jd12@gmail.com')),
((SELECT schedule_id FROM Schedules WHERE date='2024-05-02' AND start_time = "17:00:00"), 
(SELECT member_id FROM Members WHERE email='clay@yahoo.com'));





SET FOREIGN_KEY_CHECKS=1;
COMMIT;


