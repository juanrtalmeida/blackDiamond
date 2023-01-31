defmodule Backend.FileHandler do
  def handle_file_creation(filename, binary, false) do
    File.touch('priv/static/images/#{filename}')
    File.write('priv/static/images/#{filename}', binary)
    filename
  end

  def handle_file_creation(filename, binary, true) do
    random_number = Enum.random(1..1_000_000)

    handle_file_creation(
      "#{random_number}" <> filename,
      binary,
      File.exists?('priv/static/images/#{random_number}#{filename}')
    )
  end
end
