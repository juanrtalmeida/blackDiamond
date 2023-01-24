defmodule BackendWeb.NewsView do
  use BackendWeb, :view

  def render("create.json", %{news: news}),
    do: %{
      message: "Noticia criada com sucesso",
      news: %{
        title: news.title,
        description: news.description,
        image_name: news.image_name,
        author_id: news.author_id
      }
    }

  def render("error.json", %{result: result}),
    do: %{mensagem: "Erro ao criar noticia", error: result}

  def render("get_all.json", %{news: news}) do
    Enum.map(news, fn n ->
      %{
        title: n.title,
        description: n.description,
        image_name: n.image_name,
        author_id: n.author_id,
        author: %{
          name: n.author.name,
          email: n.author.email
        }
      }
    end)
  end
end
