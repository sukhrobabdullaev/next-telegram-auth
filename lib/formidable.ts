import { NextRequest } from "next/server";
import { mkdir, stat, writeFile } from "fs/promises";
import path from "path";

export async function parseForm(req: NextRequest) {
  const uploadDir = path.join(process.cwd(), "public/uploads");

  try {
    await stat(uploadDir);
  } catch (e: any) {
    if (e.code === "ENOENT") {
      await mkdir(uploadDir, { recursive: true });
    } else {
      throw e;
    }
  }

  const formData = await req.formData();
  const files: Record<string, any[]> = {};
  const fields: Record<string, string[]> = {};

  for (const [key, value] of formData.entries()) {
    if (value instanceof File) {
      const file = value;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = `${Date.now()}-${file.name}`;
      const filepath = path.join(uploadDir, filename);

      await writeFile(filepath, buffer);

      files[key] = [
        {
          size: file.size,
          filepath,
          originalFilename: file.name,
          newFilename: filename,
          mimetype: file.type,
          mtime: new Date(),
        },
      ];
    } else {
      fields[key] = [value.toString()];
    }
  }

  return { fields, files };
}
