import * as SQLite from 'expo-sqlite';

// Configura la base de datos y crea las tablas
export async function setupDatabase() {
  try {
    const db = await SQLite.openDatabaseAsync('myDatabase.db');

    await db.execAsync(`
     CREATE TABLE IF NOT EXISTS tipos_ejercicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nombre TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ejercicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        fecha TEXT NOT NULL,
        tipo_ejercicio_id INTEGER NOT NULL,
        notas TEXT,
        FOREIGN KEY (tipo_ejercicio_id) REFERENCES tipos_ejercicios(id)
      );

      CREATE TABLE IF NOT EXISTS series (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        ejercicio_id INTEGER NOT NULL,
        numero_serie INTEGER NOT NULL,
        peso REAL NOT NULL,
        repeticiones INTEGER NOT NULL,
        FOREIGN KEY (ejercicio_id) REFERENCES ejercicios(id)
      );

      CREATE TABLE IF NOT EXISTS rutinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        nombre TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS ejercicios_en_rutinas (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        rutina_id INTEGER NOT NULL,
        ejercicio_id INTEGER NOT NULL,
        FOREIGN KEY (rutina_id) REFERENCES rutinas(id),
        FOREIGN KEY (ejercicio_id) REFERENCES ejercicios(id)
      );
    `);
      // Inserta tipos de ejercicios
     await insertInitialExerciseTypes(db);

    return db;
  } catch (error) {
    console.error('Error setting up database:', error);
  }
}
// Inserta tipos de ejercicios iniciales solo si no existen
export async function insertInitialExerciseTypes(db) {
  const types = [
    'Hombro', 'Pecho', 'Femoral', 'Cuádriceps', 'Glúteos', 'Espalda', 
    'Bíceps', 'Tríceps', 'Abdominales', 'Core', 'Gemelos', 'Cardio', 'Sentadilla', 'Sentadilla2'
  ];

  for (const type of types) {
    const exists = await doesExerciseTypeExist(db, type);
    if (!exists) {
      try {
        await db.runAsync('INSERT INTO tipos_ejercicios (nombre) VALUES (?)', type);
        console.log(`Inserted exercise type: ${type}`);
      } catch (error) {
        console.error('Error inserting exercise type:', error);
      }
    }
  }
}
// Verifica si un tipo de ejercicio existe
export async function doesExerciseTypeExist(db, typeName) {
  try {
    const result = await db.getFirstAsync('SELECT id FROM tipos_ejercicios WHERE nombre = ?', typeName);
    return result ? true : false;
  } catch (error) {
    console.error('Error checking exercise type existence:', error);
    return false;
  }
}


// Inserta un tipo de ejercicio
export async function insertTipoEjercicio(db, nombre) {
  try {
    const result = await db.runAsync('INSERT INTO tipos_ejercicios (nombre) VALUES (?)', nombre);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting type of exercise:', error);
  }
}

// Inserta un ejercicio
export async function insertExercise(db, fecha, tipoEjercicioId, notas) {
  try {
    const result = await db.runAsync(
      'INSERT INTO ejercicios (fecha, tipo_ejercicio_id, notas) VALUES (?, ?, ?)',
      fecha, tipoEjercicioId, notas
    );
    console.log(`Inserted exercise with id: ${result.lastInsertRowId}`);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting exercise:', error);
  }
}

// Inserta una rutina
export async function insertRoutine(db, nombre) {
  try {
    const result = await db.runAsync('INSERT INTO rutinas (nombre) VALUES (?)', nombre);
    console.log(`Inserted routine with id: ${result.lastInsertRowId}`);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting routine:', error);
  }
}
// Inserta una serie asociada a un ejercicio
export async function insertSeries(db, ejercicioId, numeroSerie, peso, repeticiones) {
  try {
  const result = await db.runAsync(
  'INSERT INTO series (ejercicio_id, numero_serie, peso, repeticiones) VALUES (?, ?, ?, ?)',
        ejercicioId, numeroSerie, peso, repeticiones
  );
  return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting series:', error);
  }
}

       
// Relaciona un ejercicio con una rutina
export async function insertExerciseInRoutine(db, rutinaId, ejercicioId) {
  try {
    const result = await db.runAsync('INSERT INTO ejercicios_en_rutinas (rutina_id, ejercicio_id) VALUES (?, ?)', rutinaId, ejercicioId);
    console.log(`Inserted exercise in routine with id: ${result.lastInsertRowId}`);
    return result.lastInsertRowId;
  } catch (error) {
    console.error('Error inserting exercise in routine:', error);
  }
}

// Consulta un ejercicio por id
export async function getExerciseById(db, id) {
  try {
    const exercise = await db.getFirstAsync('SELECT * FROM ejercicios WHERE id = ?', id);

    if (exercise) {
      const series = await db.getAllAsync('SELECT * FROM series WHERE ejercicio_id = ?', id);
      exercise.series = series; // Agrega las series al objeto ejercicio
    }

    return exercise;
  } catch (error) {
    console.error('Error getting exercise by id:', error);
  }
}

// Consulta una rutina por id
export async function getRoutineById(db, id) {
  try {
    const result = await db.getFirstAsync('SELECT * FROM rutinas WHERE id = ?', id);
    return result;
  } catch (error) {
    console.error('Error getting routine by id:', error);
  }
}

// Consulta una ejercicios por rutina
export async function getExerciseInRotineById(db, id) {
  try {
    const result = await db.getAllAsync('SELECT * FROM ejercicios_en_rutinas WHERE id = ?', id);
    return result;
  } catch (error) {
    console.error('Error getting routine by id:', error);
  }
}
// Consulta una ejercicios por rutina
export async function getAllRoutines(db) {
  try {
    const result = await db.getAllAsync('SELECT * FROM rutinas');
    return result;
  } catch (error) {
    console.error('Error getting routines:', error);
  }
}
// Elimina un ejercicio por id
export async function deleteExerciseById(db, id) {
  try {
    const result = await db.runAsync('DELETE FROM ejercicios WHERE id = ?', id);
    console.log('Rows affected:', result.rowsAffected);
    return result.rowsAffected;
  } catch (error) {
    console.error('Error deleting exercise by id:', error);
  }
}
//elimina una rutina por su id
export async function deleteRoutineById(db, id) {
  try {
    const result = await db.runAsync('DELETE FROM rutinas WHERE id = ?', id);
    console.log('Rows affected:', result.rowsAffected);
    return result.rowsAffected;
  } catch (error) {
    console.error('Error deleting routine by id:', error);
  }
}
// Actualiza un ejercicio por id
export async function updateExerciseById(db, id, fecha, tipoEjercicioId, notas) {
  try {
    const result = await db.runAsync(
      'UPDATE ejercicios SET fecha = ?, tipo_ejercicio_id = ?, notas = ? WHERE id = ?',
      fecha, tipoEjercicioId, notas, id
    );
    console.log('Rows affected:', result.rowsAffected);
    return result.rowsAffected;
  } catch (error) {
    console.error('Error updating exercise by id:', error);
  }
}

