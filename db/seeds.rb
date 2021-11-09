# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require "csv"

# sections
arr = CSV.read('db/csv/sections.csv', headers: true).map do |row|
  {
    id: row[0],
    created_at: row[1],
    updated_at: row[2]
  }
end
Section.insert_all(arr, unique_by: :id)
ActiveRecord::Base.connection.execute("ALTER SEQUENCE sections_id_seq RESTART WITH #{Section.last.id + 1}")

# sentences
arr = CSV.read('db/csv/sentences.csv', headers: true).map do |row|
  {
    id: row[0],
    section_id: row[1],
    english: row[2],
    japanese: row[3],
    created_at: row[4],
    updated_at: row[5]
  }
end
Sentence.insert_all(arr, unique_by: :id)
ActiveRecord::Base.connection.execute("ALTER SEQUENCE sentences_id_seq RESTART WITH #{Sentence.last.id + 1}")

# words
arr = CSV.read('db/csv/words.csv', headers: true).map do |row|
  {
    id: row[0],
    sentence_id: row[1],
    english: row[2],
    japanese: row[3],
    created_at: row[4],
    updated_at: row[5]
  }
end
Word.insert_all(arr, unique_by: :id)
ActiveRecord::Base.connection.execute("ALTER SEQUENCE words_id_seq RESTART WITH #{Word.last.id + 1}")