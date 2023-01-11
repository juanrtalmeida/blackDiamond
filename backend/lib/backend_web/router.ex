defmodule BackendWeb.Router do
  use BackendWeb, :router

  alias BackendWeb.{AuthPlug, AdminPlug}

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :auth do
    plug AuthPlug
  end

  pipeline :admin do
    plug AdminPlug
  end

  scope "api", BackendWeb do
    pipe_through [:auth, :admin, :api]

    post "/create-professor", ProfessorController, :create
  end

  scope "api", BackendWeb do
    pipe_through [:auth, :api]

    post "/create/news", NewsController, :create

    get "/me", UsersController, :infos

    post "/mail/validation", UsersController, :validation
  end

  scope "/api", BackendWeb do
    pipe_through :api

    post "/register", UsersController, :create

    post "/login", UsersController, :login
  end

  # Enables LiveDashboard only for development
  #
  # If you want to use the LiveDashboard in production, you should put
  # it behind authentication and allow only admins to access it.
  # If your application does not have an admins-only section yet,
  # you can use Plug.BasicAuth to set up some basic authentication
  # as long as you are also using SSL (which you should anyway).
  if Mix.env() in [:dev, :test] do
    import Phoenix.LiveDashboard.Router

    scope "/" do
      pipe_through [:fetch_session, :protect_from_forgery]

      live_dashboard "/dashboard", metrics: BackendWeb.Telemetry
    end
  end

  if Mix.env() == :dev do
    # If using Phoenix
    forward "/sent_emails", Bamboo.SentEmailViewerPlug
  end
end
