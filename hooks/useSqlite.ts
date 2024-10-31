import { useEffect, useState } from "react";
import * as SQLite from "expo-sqlite";
import { numberToStringDate } from "@/utilities/function_helper";

export type ExtraRegister = {
  id: number;
  full_date: string;
  day: string;
  month: string;
  year: string;
  extra_value: string;
  description?: string;
};

export type ExtraRegisterNoId = Omit<ExtraRegister, "id"> & { id?: number };

//  SELECT * FROM mytalbe WHERE DATE(date) BETWEEN '2014/10/09' AND '2014/10/10'

const useExtraRegister = () => {
  const db = SQLite.openDatabaseSync("etras.db", {
    useNewConnection: true,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Initialize the table when the hook is first used
  useEffect(() => {
    //db.execAsync("DROP TABLE IF EXISTS extra_register");
    db.execAsync(
      `CREATE TABLE IF NOT EXISTS extra_register (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          full_date TEXT,
          day TEXT,
          month TEXT,
          year TEXT,
          extra_value TEXT,
          description TEXT
        );`
    );
    //db.execAsync(`DELETE FROM extra_register`);
  }, []);

  // Function to add a new record
  const addExtraRegister = async (extraRegister: ExtraRegisterNoId) => {
    setIsLoading(true);

    await deleteOldestRecords();
    const { full_date, day, month, year, extra_value, description } =
      extraRegister;
    try {
      await db.runAsync(
        "INSERT INTO extra_register (full_date, day, month,year, extra_value, description) VALUES (?, ?, ?, ?, ?, ?)",
        [full_date, day, month, year, extra_value, description || null]
      );
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const deleteOldestRecords = async () => {
    try {
      const totalRecords: any = db.getAllSync(
        "SELECT COUNT(*) as total FROM extra_register"
      );

      if (totalRecords[0].total >= 80) {
        await db.execAsync(
          "DELETE FROM extra_register WHERE id IN (SELECT id FROM extra_register ORDER BY id ASC LIMIT 50)"
        );
      }
    } catch (error) {}
  };

  // Function to retrieve all records
  const getAllExtraRegisters = () => {
    setIsLoading(true);

    try {
      const allRows = db.getAllSync(
        "SELECT * FROM extra_register ORDER BY full_date DESC"
      ) as ExtraRegister[];
      setIsLoading(false);
      return allRows || [];
    } catch (error) {
      setIsLoading(false);
    }
  };
  const getExtraRegistersBetweenDates = async () => {
    const date = new Date();
    const [year, month, rest] = date.toISOString().split("-");
    const day = date.toString().split(" ")[2];

    const currentday = Number(day);
    const currentMonth = Number(month);
    const currentYear = Number(year);

    let start_date = date.toString();
    let end_date = date.toString();
    if (currentday < 15 && currentMonth === 1) {
      start_date = numberToStringDate({
        currentYear: currentYear - 1,
        currentMonth: 12,
        currentDay: 26,
      });
      end_date = numberToStringDate({
        currentYear,
        currentMonth,
        currentDay: 10,
      });
    } else if (currentday > 15 && currentMonth === 1) {
      start_date = numberToStringDate({
        currentYear,
        currentMonth,
        currentDay: 11,
      });
      end_date = numberToStringDate({
        currentYear,
        currentMonth,
        currentDay: 25,
      });
    } else if (currentday < 15 && currentMonth > 1) {
      start_date = numberToStringDate({
        currentYear,
        currentMonth: currentMonth - 1,
        currentDay: 26,
      });
      end_date = numberToStringDate({
        currentYear,
        currentMonth,
        currentDay: 10,
      });
    } else if (currentday > 15 && currentMonth > 1) {
      start_date = numberToStringDate({
        currentYear,
        currentMonth,
        currentDay: 11,
      });
      end_date = numberToStringDate({
        currentYear,
        currentMonth,
        currentDay: 25,
      });
    }
    setIsLoading(true);
    try {
      const allRows = db.getAllSync(
        `SELECT * FROM extra_register WHERE DATE(full_date) BETWEEN ? AND ?`,
        [start_date, end_date]
      ) as ExtraRegister[];

      setIsLoading(false);
      return allRows;
    } catch (error) {
      setIsLoading(false);
    }
  };
  // Function to find records by day,month or year
  const getExtraRegistersByDayOrMonthOrYear = (searchParameter: string) => {
    setIsLoading(true);

    try {
      const allRows = db.getAllSync(
        "SELECT * FROM extra_register WHERE day = ? OR month = ? OR year = ?",
        [searchParameter, searchParameter, searchParameter, searchParameter]
      ) as ExtraRegister[];
      setIsLoading(false);

      return allRows;
    } catch (error) {
      setIsLoading(false);
    }
  };
  //get record by full date
  const findByFullDate = (full_date: string) => {
    setIsLoading(true);

    try {
      const allRows = db.getAllSync(
        "SELECT * FROM extra_register WHERE full_date = ?",
        full_date
      ) as ExtraRegister[];
      setIsLoading(false);

      return allRows;
    } catch (error) {
      setIsLoading(false);
    }
  };

  // Function to delete a specific record by ID
  const deleteExtraRegister = async (id: number | string) => {
    try {
      await db.runAsync("DELETE FROM extra_register WHERE id = ?", [id]);

      return true;
    } catch (error) {
      return false;
    }
  };

  return {
    isLoading,
    findByFullDate,
    addExtraRegister,
    getAllExtraRegisters,
    getExtraRegistersByDayOrMonthOrYear,
    getExtraRegistersBetweenDates,
    deleteExtraRegister,
  };
};

export default useExtraRegister;
