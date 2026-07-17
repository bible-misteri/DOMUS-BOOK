import yaml


class MetadataWriter:

    def write(

        self,

        path,

        metadata

    ):

        with open(

            path,

            "w",

            encoding="utf-8"

        ) as f:

            yaml.safe_dump(

                metadata,

                f,

                allow_unicode=True,

                sort_keys=False

            )
