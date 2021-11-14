class CreateMyListSentences < ActiveRecord::Migration[6.1]
  def change
    create_table :my_list_sentences do |t|
      t.references :my_list, null: false, foreign_key: true
      t.references :sentence, null: false, foreign_key: true

      t.timestamps
    end
  end
end
