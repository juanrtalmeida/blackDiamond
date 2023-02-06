defmodule Backend.Helpers.Reports do
  alias Backend.Models.{Report}
  alias Backend.Repo

  def create_change_report(model, changes, conn) do
    changes_array =
      changes
      |> Enum.map(fn {key, value} ->
        keyvalue = get_dictionary_translation(key)
        "#{keyvalue} foi trocado para #{value}"
      end)

    Report.create_changeset(%{
      user_id: conn.assigns[:user_info].id,
      changes: changes_array,
      type: "alteração",
      model: model
    })
    |> Repo.insert()
  end

  def create_creation_report(model, creation_values, conn) do
    changes_array =
      creation_values
      |> Enum.map(fn {key, value} ->
        keyvalue = get_dictionary_translation(key)
        "#{keyvalue}: #{value}"
      end)

    Report.create_changeset(%{
      user_id: conn.assigns[:user_info].id,
      changes: changes_array,
      type: "criação",
      model: model
    })
    |> Repo.insert()
  end

  defp get_dictionary_translation(key) do
    dictionary = %{
      description: "Descrição",
      name: "Nome",
      price: "Preço",
      stock: "Quantidade",
      starting_hour: "Horário de início",
      type: "Tipo",
      frequency: "Frequência",
      responsable_id: "Responsável",
      students: "Alunos",
      title: "Título",
      image_name: "Imagem",
      responsable: "Responsável",
      category: "Categoria"
    }

    Map.get(dictionary, key)
  end
end
