/*    ==Scripting Parameters==

    Source Server Version : SQL Server 2016 (13.0.4422)
    Source Database Engine Edition : Microsoft SQL Server Express Edition
    Source Database Engine Type : Standalone SQL Server

    Target Server Version : SQL Server 2016
    Target Database Engine Edition : Microsoft SQL Server Express Edition
    Target Database Engine Type : Standalone SQL Server
*/

USE [master]
GO

/****** Object:  Database [imdb]    Script Date: 8/18/2017 12:31:42 AM ******/
CREATE DATABASE [imdb]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'imdb', FILENAME = N'D:\RDSDBDATA\DATA\imdb.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 10%)
 LOG ON 
( NAME = N'imdb_log', FILENAME = N'D:\RDSDBDATA\DATA\imdb_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [imdb] SET COMPATIBILITY_LEVEL = 130
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [imdb].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [imdb] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [imdb] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [imdb] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [imdb] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [imdb] SET ARITHABORT OFF 
GO

ALTER DATABASE [imdb] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [imdb] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [imdb] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [imdb] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [imdb] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [imdb] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [imdb] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [imdb] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [imdb] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [imdb] SET  DISABLE_BROKER 
GO

ALTER DATABASE [imdb] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [imdb] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [imdb] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [imdb] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [imdb] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [imdb] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [imdb] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [imdb] SET RECOVERY FULL 
GO

ALTER DATABASE [imdb] SET  MULTI_USER 
GO

ALTER DATABASE [imdb] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [imdb] SET DB_CHAINING OFF 
GO

ALTER DATABASE [imdb] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [imdb] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [imdb] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [imdb] SET QUERY_STORE = OFF
GO

USE [imdb]
GO

ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET LEGACY_CARDINALITY_ESTIMATION = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET MAXDOP = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET PARAMETER_SNIFFING = PRIMARY;
GO

ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO

ALTER DATABASE SCOPED CONFIGURATION FOR SECONDARY SET QUERY_OPTIMIZER_HOTFIXES = PRIMARY;
GO

ALTER DATABASE [imdb] SET  READ_WRITE 
GO
