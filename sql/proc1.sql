-- ================================================
-- Template generated from Template Explorer using:
-- Create Procedure (New Menu).SQL
--
-- Use the Specify Values for Template Parameters 
-- command (Ctrl-Shift-M) to fill in the parameter 
-- values below.
--
-- This block of comments will not be included in
-- the definition of the procedure.
-- ================================================
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE proc1 
	-- Add the parameters for the stored procedure here
	@Param1 NVARCHAR(MAX) = 'TEST DEFAULT' 
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	DECLARE @Date DATE 
	SELECT @Date = MyDate1 FROM TestTableSize WHERE MyKeyField = '0000000000'
	--SELECT '123' + CONVERT(VARCHAR(20), @Date)
	
    -- Insert statements for procedure here
	SELECT @Param1 + ' ' + CONVERT(VARCHAR(20), @Date)
END
GO
