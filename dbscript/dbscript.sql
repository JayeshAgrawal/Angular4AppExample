CREATE TABLE [dbo].[tblContact] (
    [id]      INT            IDENTITY (1, 1) NOT NULL,
    [name]    NVARCHAR (100) NULL,
    [email]   NVARCHAR (100) NULL,
    [gender]  NVARCHAR (50)  NULL,
    [birth]   DATE           NULL,
    [techno]  NVARCHAR (100) NULL,
    [message] NVARCHAR (255) NULL,
    PRIMARY KEY CLUSTERED ([id] ASC)
);

