<?php

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

if (! function_exists('upload_file')) {
    /**
     * function for uploading file
     * @param UploadedFile $file
     * @param string $path
     * @return string
     */
    function upload_file(UploadedFile $file, string $path): string
    {
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '-' . Str::uuid() . "." . $extension;

        Storage::disk('public')->putFileAs($path, $file, $filename);

        return "storage/$path/$filename";
    }
}

if (! function_exists('remove_file')) {
    /**
     * @param string $path
     * @return bool
     */
    function remove_file(?string $path): bool
    {
        $cleanPath = str_replace('storage/', '', $path);

        if ($cleanPath && Storage::disk('public')->exists($cleanPath)) {
            return Storage::disk('public')->delete($cleanPath);
        }

        return false;
    }
}
