locals {
    name = "web-conexaodelivery-admin"
    path = "/admin"
    region = "us-east-1"
    env = "prd"
    bucket = "terraform-backend.conexaodelivery.com.br"
}

remote_state {
    backend = "s3"
    config = {
        bucket = local.bucket
        key = "${local.env}/cloudfront/${local.name}/terraform.tfstate"
        region = local.region
        encrypt = false
    }
}

inputs = {
    env                 = local.env
    region              = local.region
    remote_state_bucket = local.bucket
    remote_state_key    = "${local.env}/terraform.tfstate"

    bucket_name         = "admin.conexaodelivery.com.br"
    domain              = "admin.conexaodelivery.com.br"
}