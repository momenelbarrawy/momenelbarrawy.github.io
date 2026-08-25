import os

# ==========================
# ADD YOUR FILE PATHS HERE
# ==========================
files = [

r"quartz.layout.ts",
r"quartz.config.ts",

r"quartz/components/Explorer.tsx",
r"quartz/components/Header.tsx",
r"quartz/components/PageTitle.tsx",
r"quartz/styles/base.scss",
r"quartz/styles/variables.scss",
r"quartz/components/styles/explorer.scss"

]
# Output file
output_file = "all_files_output.txt"


def read_file(file_path):
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()
    except UnicodeDecodeError:
        try:
            with open(file_path, "r", encoding="latin-1") as f:
                return f.read()
        except Exception as e:
            return f"[ERROR READING FILE: {e}]"
    except Exception as e:
        return f"[ERROR: {e}]"


with open(output_file, "w", encoding="utf-8") as out:
    for i, file_path in enumerate(files, 1):
        content = read_file(file_path)

        out.write(f'{i}\n')
        out.write(f'"{file_path}"\n')
        out.write('"""\n')
        out.write(content)
        out.write('\n"""\n\n')


print(f"Done. Output saved to: {output_file}")