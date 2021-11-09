class CreateWords < ActiveRecord::Migration[6.1]
  def change
    create_table :words do |t|
      t.references :sentence, null: false, foreign_key: true
      t.string :english, null: false
      t.string :japanese, null: false

      t.timestamps
    end
  end
end
