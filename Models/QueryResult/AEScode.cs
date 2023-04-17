using System;
using System.Security.Cryptography;
using System.Text;

namespace DemoDotnetVue2.Models.QueryResult
{
    public class AEScode
    {
        public AEScode()
        {

        }
        private static readonly string CryptoKey = "1234567812345678";
        private static readonly string CryptoIV = "8765432187654321";

        public static string AesEncryptBase64(string SourceStr)
        {
            Aes aes = Aes.Create();
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            ICryptoTransform transform = aes.CreateEncryptor(Encoding.UTF8.GetBytes(CryptoKey), Encoding.UTF8.GetBytes(CryptoIV));

            byte[] bPlainText = Encoding.UTF8.GetBytes(SourceStr);
            byte[] outputData = transform.TransformFinalBlock(bPlainText, 0, bPlainText.Length);
            return Convert.ToBase64String(outputData);
        }
        public static string AesDecryptBase64(string base64String)
        {
            Aes aes = Aes.Create();
            aes.Mode = CipherMode.CBC;
            aes.Padding = PaddingMode.PKCS7;

            ICryptoTransform transform = aes.CreateDecryptor(Encoding.UTF8.GetBytes(CryptoKey), Encoding.UTF8.GetBytes(CryptoIV));

            byte[] outputData;
            byte[] bEnBase64String = Convert.FromBase64String(base64String);
            outputData = transform.TransformFinalBlock(bEnBase64String, 0, bEnBase64String.Length);
            return Encoding.UTF8.GetString(outputData);
        }
    }
}
