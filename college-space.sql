-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 12, 2022 at 04:59 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `college-space`
--

-- --------------------------------------------------------

--
-- Table structure for table `assignment`
--

CREATE TABLE `assignment` (
  `assignment-name` varchar(50) NOT NULL,
  `assignment-desc` varchar(50) NOT NULL,
  `teamname` varchar(50) NOT NULL,
  `duedate` datetime NOT NULL,
  `creationdate` datetime NOT NULL DEFAULT current_timestamp(),
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment`
--

INSERT INTO `assignment` (`assignment-name`, `assignment-desc`, `teamname`, `duedate`, `creationdate`, `id`) VALUES
('Tutorial 1', 'LPP', 'Maths', '2022-04-15 20:14:00', '2022-04-12 20:15:03', 1);

-- --------------------------------------------------------

--
-- Table structure for table `assignment-upload`
--

CREATE TABLE `assignment-upload` (
  `id` int(11) NOT NULL,
  `teamname` varchar(20) NOT NULL,
  `assign-name` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `filename` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `teamname` varchar(50) NOT NULL,
  `uqid` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  `title` varchar(50) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`teamname`, `uqid`, `date`, `title`, `id`) VALUES
('Maths', 'd5ad743f-28b9-41f1-81b8-c1d285503d0e', '2022-04-13 20:16:00', 'Maths LPP', 1);

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `teamname` varchar(50) NOT NULL,
  `fileaddress` varchar(200) NOT NULL,
  `id` int(11) NOT NULL,
  `filename` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`teamname`, `fileaddress`, `id`, `filename`) VALUES
('Maths', 'C:UserskhushDesktop\nawabcollege-spacepublicuploads/2003013 Ex1.pdf', 1, '2003013 Ex1.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `notices`
--

CREATE TABLE `notices` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `msg` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notices`
--

INSERT INTO `notices` (`id`, `email`, `date`, `msg`) VALUES
(1, 'tr@g', '2022-04-04 17:24:51', 'Tommorow is Holiday'),
(2, 'tr@g', '2022-04-04 17:25:41', 'PHP code is usually processed on a web server by a PHP interpreter implemented as a module, a daemon'),
(3, 'tr@g', '2022-04-04 17:26:27', 'PHP code is usually processed on a web server by a PHP interpreter implemented as a module, a daemon or as a Common Gateway Interface (CGI) executable. On a web server, the result of the interpreted and executed PHP code – which may be any type of data, such as generated HTML or binary image data – would form the whole or part of an HTTP response. Various web template systems, web content management systems, and web frameworks exist which can be employed to orchestrate or facilitate the generati'),
(4, 'tr@g', '2022-04-12 20:17:31', 'lets check notice');

-- --------------------------------------------------------

--
-- Table structure for table `study_on`
--

CREATE TABLE `study_on` (
  `id` int(11) NOT NULL,
  `team_name` varchar(20) NOT NULL,
  `member` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `study_on`
--

INSERT INTO `study_on` (`id`, `team_name`, `member`) VALUES
(1, 'Maths', 's1@g'),
(2, 'Maths', 's2@g'),
(3, 'Maths', 's3@g'),
(4, 'Maths', 's4@g');

-- --------------------------------------------------------

--
-- Table structure for table `teaches_on`
--

CREATE TABLE `teaches_on` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `team_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teaches_on`
--

INSERT INTO `teaches_on` (`id`, `email`, `team_name`) VALUES
(1, 'tr@g', 'Maths');

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `id` int(11) NOT NULL,
  `team_name` varchar(20) NOT NULL,
  `team_description` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`id`, `team_name`, `team_description`) VALUES
(1, 'Maths', 'SEM 4');

-- --------------------------------------------------------

--
-- Table structure for table `userdetail`
--

CREATE TABLE `userdetail` (
  `id` int(11) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(20) NOT NULL,
  `status` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userdetail`
--

INSERT INTO `userdetail` (`id`, `email`, `password`, `status`) VALUES
(1, 'md.r.a.n.786@gmail.com', '123', 'student'),
(2, 'tr@g', '123', 'teacher'),
(3, 's1@g', '123', 'student'),
(4, 's2@g', '123', 'student'),
(5, 's3@g', '123', 'student'),
(6, 's4@g', '123', 'student'),
(7, 's5@g', '123', 'student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `assignment-upload`
--
ALTER TABLE `assignment-upload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `study_on`
--
ALTER TABLE `study_on`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teaches_on`
--
ALTER TABLE `teaches_on`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teams`
--
ALTER TABLE `teams`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userdetail`
--
ALTER TABLE `userdetail`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assignment-upload`
--
ALTER TABLE `assignment-upload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notes`
--
ALTER TABLE `notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notices`
--
ALTER TABLE `notices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `study_on`
--
ALTER TABLE `study_on`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `teaches_on`
--
ALTER TABLE `teaches_on`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teams`
--
ALTER TABLE `teams`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `userdetail`
--
ALTER TABLE `userdetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
