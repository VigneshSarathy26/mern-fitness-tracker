# Infrastructure Directory

This directory contains all the cloud-native infrastructure configuration for the MERN Fitness Tracker platform.

## Structure

- **/docker**: Per-service Dockerfiles and base image configurations.
- **/kubernetes**: K8s manifests organized by Base and Overlays (Kustomize).
  - `/base`: Core service definitions.
  - `/overlays`: Environment-specific (dev, staging, prod) overrides.
  - `/namespaces`: Logic isolation for the cluster.
- **/helm**: Modular Helm charts for automated deployments.
- **/terraform**: Infrastructure as Code for cloud provisioning (AWS/Azure/GCP).
- **/istio**: Service mesh configuration for traffic management and security.
- **/argocd**: GitOps application manifests for CD.
- **/observability**: Monitoring and Logging stack.
  - `prometheus/`: Metrics collection.
  - `grafana/`: Visualization dashboards.
  - `elk/`: Elasticsearch, Logstash, Kibana for logging.
  - `tracing/`: Distributed tracing (Jaeger/Zipkin).
