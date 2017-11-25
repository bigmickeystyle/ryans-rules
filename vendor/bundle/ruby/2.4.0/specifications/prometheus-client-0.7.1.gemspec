# -*- encoding: utf-8 -*-
# stub: prometheus-client 0.7.1 ruby lib

Gem::Specification.new do |s|
  s.name = "prometheus-client".freeze
  s.version = "0.7.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Tobias Schmidt".freeze]
  s.date = "2017-05-24"
  s.email = ["ts@soundcloud.com".freeze]
  s.homepage = "https://github.com/prometheus/client_ruby".freeze
  s.licenses = ["Apache 2.0".freeze]
  s.rubygems_version = "2.6.13".freeze
  s.summary = "A suite of instrumentation metric primitivesthat can be exposed through a web services interface.".freeze

  s.installed_by_version = "2.6.13" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<quantile>.freeze, ["~> 0.2.0"])
    else
      s.add_dependency(%q<quantile>.freeze, ["~> 0.2.0"])
    end
  else
    s.add_dependency(%q<quantile>.freeze, ["~> 0.2.0"])
  end
end
